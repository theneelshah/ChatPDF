from file_operations import process_pdf
from ai_model import initialize_chat, generate_response

pdf_text_cache = {}

def process_and_cache_pdf(file_path):
    if not file_path:
        return None

    pdf_text = process_pdf(file_path)
    pdf_text_cache[file_path] = pdf_text
    initialize_chat(pdf_text)

    return pdf_text

def ask_question(question, file_path):
    print(question)
    if not question or not file_path:
        return None

    pdf_text = pdf_text_cache.get(file_path)

    if not pdf_text:
        pdf_text = process_and_cache_pdf(file_path)

    if not pdf_text:
        return None

    return generate_response(question)
