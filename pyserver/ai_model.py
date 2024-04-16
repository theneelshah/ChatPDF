import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key= os.getenv('OPEN_AI_API_KEY')
)

messages = [{"role": "system", "content": "You are a helpful assistant."}]

def initialize_chat(pdf_text):
    """Initialize the chat object based on the pdf text

    Args:
        pdf_text (string): the pdf text
    """
    
    messages.append({"role": "user", "content": "I'll be giving you an excerpt from a PDF file. " +
                "Don't use any other content or any of you pre-fed knowledge from other sources. " +
                "Please use only the data that I feed you. " +
                "Later on, I'll be asking you some questions based on the data I provided. " +
                "I need you to answer those questions for me. Don't generate any questions. "+
                "I'll ask you the questions later. " +
                "The excerpt will start and end with triple backticks (```). " +
                " The data is: " +
                f'```{pdf_text}```'})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=100
    )
    
    print(response.choices[0].message)
    messages.append(response.choices[0].message)
    
def generate_response(question):
    """Generate the response for the question

    Args:
        question (string)

    Returns:
        string: the answer
    """
    
    messages.append({"role": "user", "content": "Question: " + question})
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=100
    )
    messages.append({"role": "assistant", "content": response.choices[0].message.content})
    
    return response.choices[0].message.content
