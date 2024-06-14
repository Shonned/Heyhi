import os
from openai import OpenAI

from backend.v2.openai import config

client = OpenAI(api_key=config.OPENAI_API_KEY)


def improve_message(message):
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
             "content": f"Please improve the following message to be more human and polite:\n\n{message}"}
        ],
        model="gpt-3.5-turbo",
    )
    return chat_completion.choices[0].message.content


def improve_explanations(message):
    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
             "content": f"Please improve the following message to be more human and polite. Do not change the parts starting with 'Additionally' and do not add any closing sentences like 'Please let me know if you need more guidance or have any questions about these recommendations. I'm here to help!':\n\n{message}"}
        ],
        model="gpt-3.5-turbo",
    )
    return chat_completion.choices[0].message.content
