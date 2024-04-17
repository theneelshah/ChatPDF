## Context

This project aims at reading a PDF file and then answering questions based on the PDF file.

## Comments about the project

- The project uses a React frontend and a Flask backend.
- The list of external 3rd party libraries used:
  -- `flask` - for creating a backend endpoints
  -- `react` - for creating the frontend
  -- `react-dropzone` - for uploading a pdf via "drag-n-drop"
  -- `styled-components` - for styling the react components
  -- `OpenAI` - for the gpt3.5 model
  -- `pypdf` - for converting pdf to text

## Steps to run locally

1. Clone the repo locally & cd into the project root

```
git clone https://github.com/theneelshah/ChatPDF
cd ChatPDF
```

2. . Create a `.env` file in the root directory and put OpenAI API creds. You can create yours from [here](https://platform.openai.com/api-keys)

```
touch .env
echo OPEN_AI_API_KEY=<YOUR-API-CREDS> > .env
```

3. Execute the `run` script to start the local server.

```
./run.sh
```

The local server now run on `http://127.0.0.1:5000/` locally

## Demo

![gif0](https://drive.google.com/file/d/1SZ_dQr1PTr-2rypvhTDu1v_0F2lH-wSa/view?usp=sharing)

- You can switch between the existing pdfs or upload a new pdf using the switch on the left panel.
- You can upload a new pdf either via dropping it in the dropbox or selecting it from the file system.
- In either case, once the file is selected or uploaded, you can ask questions and receive answers.

![gif1](https://drive.google.com/file/d/1SZ_dQr1PTr-2rypvhTDu1v_0F2lH-wSa/view?usp=sharing)
![gif2](https://drive.google.com/file/d/1SZ_dQr1PTr-2rypvhTDu1v_0F2lH-wSa/view?usp=sharing)
![gif3](https://drive.google.com/file/d/1SZ_dQr1PTr-2rypvhTDu1v_0F2lH-wSa/view?usp=sharing)

## Future scope

- Maintain conversational context
- Save chat history
- Use word embeddings to pass only relevant text to the model
