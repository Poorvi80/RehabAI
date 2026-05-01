from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os
from dotenv import load_dotenv

load_dotenv()

llm = OpenAI(temperature=0.7)

template = """
You are a professional physiotherapy assistant.

Suggest rehab exercises and advice for:
{condition}
"""

prompt = PromptTemplate(
    input_variables=["condition"],
    template=template
)

chain = LLMChain(llm=llm, prompt=prompt)

def get_rehab_advice(condition):
    return chain.run(condition)