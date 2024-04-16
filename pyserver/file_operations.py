from pypdf import PdfReader

def save_uploaded_file(file):
    if not file:
        return None

    if file.filename == '':
        return None

    if not file.filename.endswith('.pdf'):
        return None

    file_path = 'uploads/' + file.filename
    file.save(file_path)
    return file_path

def process_pdf(file_path):
    if not file_path:
        return None

    all_text = ""

    with open(file_path, 'rb') as pdf_file:
        pdf_reader = PdfReader(pdf_file)

        for page in pdf_reader.pages:
            text = page.extract_text()
            all_text += text + "\n"

    return all_text