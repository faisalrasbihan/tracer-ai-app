import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function AnalysisView({ selectedDocument, messages, inputMessage, setInputMessage, handleSendMessage, onBack }) {
  return (
    <main className="flex-1 overflow-hidden p-6">
      <div className="mb-4">
        <Button variant="ghost" onClick={onBack}>← Back to Home</Button>
      </div>
      <div className="h-full flex space-x-4">
        {/* PDF Viewer */}
        <div className="w-1/2 bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">PDF Viewer</h3>
          <div className="h-[calc(100%-2rem)] bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">PDF Viewer placeholder for {selectedDocument?.name}</p>
          </div>
        </div>

        {/* AI Chat Interface */}
        <div className="w-1/2 bg-white shadow rounded-lg p-4 flex flex-col">
          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Chat</h3>
          <ScrollArea className="flex-grow mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow mr-2" />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
