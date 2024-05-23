// import { createMessage } from '@/lib/actions/message.actions'
// import { pusherServer } from '@/lib/pusher'

// export async function POST(req: Request) {
//   const { text, roomId } = await req.json()

//   pusherServer.trigger(roomId, 'incoming-message', text)

//   await createMessage(text.sender._id, text.recipient, text.content)

//   return new Response(JSON.stringify({ success: true }))
// }