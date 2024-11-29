import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import BertTokenizer, BertModel
import numpy as np
from pdfminer.high_level import extract_text
import spacy
import logging

app = Flask(__name__)
CORS(app, resources={r"/upload_resume": {"origins": "*"}})

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SkillExtractorML:
    def __init__(self):
        try:
            self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
            self.model = BertModel.from_pretrained('bert-base-uncased')
            # Load spaCy's English model
            self.nlp = spacy.load('en_core_web_sm')
        except Exception as e:
            logger.error(f"Error loading model or tokenizer: {e}")
            raise

        self.skills = {
            "frontend developer": ["JavaScript", "React.js", "HTML/CSS", "Bootstrap", "Tailwind CSS"],
            "backend developer": ["Node.js", "Express.js", "SQL", "NoSQL"],
            "app developer": ["Flutter", "Dart", "Swift", "Kotlin"],
            "devops engineer": ["Docker", "Kubernetes", "AWS", "Azure"],
            "website developer": ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap"],
            "software developer": ["C/C++", "Java", "DSA", "OOPS", "DBMS"]
        }

        self.general_skills = ["Python", "JavaScript", "React.js", "HTML/CSS", "Node.js", "Express.js",
                               "SQL", "NoSQL", "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP",
                               "Django", "Flask", "HTML", "CSS", "Flutter", "Dart"]

        self.skill_embeddings = self._get_skill_embeddings()
        self.general_skill_embeddings = self._get_general_skill_embeddings()

    def _embed_text(self, text):
        inputs = self.tokenizer(text, return_tensors='pt', truncation=True, padding=True)
        with torch.inference_mode():
            outputs = self.model(**inputs)
        return outputs.last_hidden_state.mean(dim=1).numpy()

    def _get_skill_embeddings(self):
        skill_embeddings = {}
        for category, skills in self.skills.items():
            skill_embeddings[category] = np.vstack([self._embed_text(skill) for skill in skills])
        return skill_embeddings

    def _get_general_skill_embeddings(self):
        return np.vstack([self._embed_text(skill) for skill in self.general_skills])

    def extract_skills(self, job_title, resume_text):
        # Use spaCy for basic text processing
        doc = self.nlp(resume_text)
        extracted_skills = self._find_skills_in_text(doc)

        matched_category = next((category for category in self.skills if category in job_title.lower()), None)
        relevant_skills = self.skills[matched_category] if matched_category else self._find_similar_skills(job_title)

        return [skill for skill in relevant_skills if skill not in extracted_skills]

    def _find_skills_in_text(self, doc):
        # Match the predefined skills in the resume text
        skills_in_text = []
        for token in doc:
            if token.text.lower() in map(str.lower, self.general_skills):
                skills_in_text.append(token.text)
        return skills_in_text

    def _find_similar_skills(self, job_title):
        job_title_embedding = self._embed_text(job_title)
        similarities = np.dot(job_title_embedding, self.general_skill_embeddings.T).flatten()
        threshold = 0.7
        return [skill for skill, sim in zip(self.general_skills, similarities) if sim > threshold]


extractor = SkillExtractorML()

@app.route('/upload_resume', methods=['POST', 'OPTIONS'])
def upload_resume():
    try:
        if 'pdf_file' not in request.files:
            logger.error('No PDF file uploaded')
            return jsonify({'error': 'No PDF file uploaded'}), 400

        pdf_file = request.files['pdf_file']
        
        # Ensure uploads directory exists
        os.makedirs('uploads', exist_ok=True)
        file_path = os.path.join('uploads', pdf_file.filename)
        pdf_file.save(file_path)

        # Extract text from PDF
        resume_text = extract_text(file_path)
        logger.info(f"Extracted text from {pdf_file.filename}")

        job_title = request.form.get('job_title', '')
        if not job_title:
            logger.error('Job title is required')
            return jsonify({'error': 'Job title is required'}), 400

        recommended_skills = extractor.extract_skills(job_title, resume_text)

        # Log the results
        logger.info(f"Job Title: {job_title}")
        logger.info(f"Recommended Skills: {recommended_skills}")

        return jsonify({
            'recommended_skills': recommended_skills
        })

    except Exception as e:
        logger.error(f"Error processing resume: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)