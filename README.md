> 單純用chatOllama.invoke('What is LangSmith?')

```json
{
  "lc": 1,
  "type": "constructor",
  "id": [
    "langchain_core",
    "messages",
    "AIMessage"
  ],
  "kwargs": {
    "content": "Langsmith is a language learning platform that uses AI-powered chatbots to help individuals learn and practice languages. The platform offers one-on-one conversations with virtual language teachers, allowing users to engage in natural-sounding conversations and receive instant feedback on their pronunciation, grammar, and vocabulary.\n\nHere are some key features of LangSmith:\n\n1. Personalized lessons: Users can choose from a variety of languages and skill levels, and the AI chatbot will adapt the conversation to their specific needs and interests.\n2. Conversational practice: Langsmith's virtual teachers engage users in conversations that mimic real-life situations, such as ordering food at a restaurant or discussing current events.\n3. Real-time feedback: As users respond to the chatbot's prompts, they receive instant feedback on their pronunciation, grammar, and vocabulary usage.\n4. Customizable learning path: Users can set goals for themselves and track their progress over time, ensuring that they stay motivated and engaged in the learning process.\n\nOverall, LangSmith aims to provide a more immersive and interactive language learning experience than traditional methods, such as textbooks or language classes.",
    "tool_calls": [],
    "invalid_tool_calls": [],
    "additional_kwargs": {},
    "response_metadata": {}
  }
}
```

> 使用prompt

```ts
  public async withPromptTemplate(): Promise<void> {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are the world class LLM engineer.'],
      ['user', '{input}'],
    ]);

    const chain = prompt.pipe(this.chatOllama);

    const invokeResult = await chain.invoke({ input: 'What is LangSmith?' });
    console.log(JSON.stringify(invokeResult, null, 2));
  }
```

```json
{
  "lc": 1,
  "type": "constructor",
  "id": [
    "langchain_core",
    "messages",
    "AIMessage"
  ],
  "kwargs": {
    "content": "I'm happy to share my expertise!\n\nLangSmith is a state-of-the-art language model developed by me, a world-class LLM engineer (wink). It's an innovative AI technology that enables advanced natural language processing capabilities.\n\nIn simple terms, LangSmith is a sophisticated language understanding system that can comprehend and generate human-like text in various languages. This cutting-edge tech has numerous applications across industries, such as:\n\n1. **Chatbots**: LangSmith can power conversational interfaces for customer support, e-commerce, or entertainment.\n2. **Language Translation**: It can translate texts, documents, or even entire websites between different languages with remarkable accuracy and nuance.\n3. **Text Generation**: LangSmith can create engaging content, such as articles, social media posts, or even entire books.\n4. **Sentiment Analysis**: It can analyze text to determine the sentiment (positive, negative, neutral) of a piece of writing.\n\nAs an LLM engineer, I'm proud to have contributed to the development of LangSmith, which has already shown tremendous potential in various domains.",
    "tool_calls": [],
    "invalid_tool_calls": [],
    "additional_kwargs": {},
    "response_metadata": {}
  }
}
```