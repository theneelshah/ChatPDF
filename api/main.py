from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from file_operations import save_uploaded_file, get_pdfs
from handlers import process_and_cache_pdf, ask_question

app = Flask(__name__,static_url_path='',
                  static_folder='../client/build',
                  template_folder='../client/build')
CORS(app)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files.get('file')
    file_path = save_uploaded_file(uploaded_file)

    if not file_path:
        return jsonify({'error': 'Invalid file'}), 400

    message = process_and_cache_pdf(file_path)

    return jsonify({'message': 'File uploaded and processed successfully', 'reply': message}), 200

@app.route('/api/initialize-existing-file', methods=['POST'])
def initialize_file():
    file = request.json.get('file')
    message = process_and_cache_pdf("api/uploads/" + file)

    return jsonify({'message': 'File Selected', 'reply': message}), 200

@app.route('/api/ask', methods=['POST'])
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


@app.route('/api/existing', methods=['GET'])
def get_existing_pdfs():
    files = get_pdfs()
    
    return jsonify({'files': files}), 200

@app.route("/")
def hello():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)
