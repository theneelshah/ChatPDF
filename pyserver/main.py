from flask import Flask, request, jsonify
from flask_cors import CORS
from file_operations import save_uploaded_file
from handlers import process_and_cache_pdf, ask_question

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files.get('file')
    file_path = save_uploaded_file(uploaded_file)

    if not file_path:
        return jsonify({'error': 'Invalid file'}), 400

    message = process_and_cache_pdf(file_path)

    return jsonify({'message': 'File uploaded and processed successfully', 'reply': message}), 200

@app.route('/ask', methods=['POST'])
def ask_question_endpoint():
    data = request.json
    question = data.get('question')
    file_path = data.get('file_path')

    if not question or not file_path:
        return jsonify({'error': 'Question or file path missing'}), 400

    answer = ask_question(question, file_path)

    if not answer:
        return jsonify({'error': 'Failed to generate answer'}), 500

    return jsonify({'question': question, 'answer': answer}), 200

if __name__ == '__main__':
    app.run(debug=True)
