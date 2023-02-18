export async function handler(event, content) {
  return {
    event: event,
    content: content,
    message: "Hello World"
  }
}
