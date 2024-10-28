'use client';
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Upload, Home, Workflow, Users, Settings, MessageSquare, Loader2, CheckCircle2, FileText, UserCircle, ClipboardList, ListTodo, Search, ExternalLink, BarChart2, Send } from "lucide-react"
import { AnalysisView } from "./analysis-view"

export function TraceAiApp() {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState([])
  const [documents, setDocuments] = useState([])
  const [selectedWorkflow, setSelectedWorkflow] = useState("Penunjukan langsung")
  const [currentView, setCurrentView] = useState("main")
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const fileInputRef = useRef(null)

  const handleUpload = (file) => {
    setIsUploading(true)
    setProgress([])

    const progressSteps = [
      { text: "Document received", completed: false },
      { text: "Starting analysis...", completed: false },
      { text: "Checking procurement details", completed: false },
      { text: "Verifying compliance", completed: false },
      { text: "Generating audit report", completed: false }
    ]
    
    setProgress(progressSteps)

    const updateProgress = (index) => {
      if (index >= progressSteps.length) {
        setIsUploading(false)
        // Add new document using the actual file details
        const newDocument = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name || `Document_${documents.length + 1}.pdf`,
          uploadDate: new Date().toLocaleString(),
          status: "Completed",
          vendor: ["Acme Corp", "TechSupply Inc.", "Global Goods Ltd."][Math.floor(Math.random() * 3)],
          amount: Math.floor(Math.random() * 100000000) + 1000000,
          riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
          file: file
        }
        setDocuments(prev => [...prev, newDocument])
        return
      }

      setProgress(current => 
        current.map((item, i) => 
          i === index ? { ...item, completed: true } : item
        )
      )

      setTimeout(() => updateProgress(index + 1), 2000)
    }

    setTimeout(() => updateProgress(0), 2000)
  }

  const handleViewDetails = (document) => {
    setSelectedDocument(document)
    setCurrentView("analysis")
  }

  const handleBackToHome = () => {
    setCurrentView("main")
    setSelectedDocument(null)
    setMessages([])
  }

  const getRiskLevelCounts = () => {
    const counts = { Low: 0, Medium: 0, High: 0 }
    documents.forEach(doc => {
      counts[doc.riskLevel]++
    })
    return counts
  }

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { role: "user", content: inputMessage }])
      setInputMessage("")
      // Simulate AI response
      setTimeout(() => {
        setMessages(
          prev => [...prev, { role: "assistant", content: "This is a simulated AI response to your query about the document." }]
        )
      }, 1000)
    }
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      // Create a copy of the file to ensure it's properly stored
      const fileBlob = new Blob([file], { type: 'application/pdf' })
      handleUpload(fileBlob)
    } else {
      alert('Please select a PDF file')
    }
    // Reset file input
    event.target.value = ''
  }

  const renderMainView = () => (
    <main className="flex-1 overflow-hidden p-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf"
        className="hidden"
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Documents</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="workflow-select" className="text-sm font-medium text-gray-700">
            Workflow:
          </label>
          <Select
            value={selectedWorkflow}
            onValueChange={(value) => setSelectedWorkflow(value)}>
            <SelectTrigger id="workflow-select" className="w-[220px]">
              <SelectValue placeholder="Select workflow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Penunjukan langsung">Penunjukan langsung</SelectItem>
              <SelectItem value="Pemilihan langsung">Pemilihan langsung</SelectItem>
              <SelectItem value="Pengadaan dikecualikan">Pengadaan dikecualikan</SelectItem>
              <SelectItem value="Tender terbuka">Tender terbuka</SelectItem>
              <SelectItem value="Tender tertutup">Tender tertutup</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-gray-400" />
                    {doc.name}
                  </div>
                </TableCell>
                <TableCell>{doc.uploadDate}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {doc.status === "Completed" ? (
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                    ) : doc.status === "In Progress" ? (
                      <Loader2 className="mr-2 h-4 w-4 text-blue-500 animate-spin" />
                    ) : (
                      <div className="mr-2 h-4 w-4 rounded-full bg-yellow-500" />
                    )}
                    {doc.status}
                  </div>
                </TableCell>
                <TableCell>{doc.vendor}</TableCell>
                <TableCell>Rp. {doc.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        doc.riskLevel === "Low" ? "bg-blue-500" :
                        doc.riskLevel === "Medium" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                    {doc.riskLevel}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm" onClick={() => handleViewDetails(doc)}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Analyze
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )

  const renderNavigation = () => (
    <nav className="mt-20">
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); handleBackToHome(); }}
        className={`flex items-center px-4 py-2 text-gray-700 ${currentView === "main" ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
        <Home className="w-5 h-5 mr-2" />
        Home
      </a>
      {currentView === "analysis" && (
        <a
          href="#"
          className="flex items-center px-4 py-2 text-gray-700 bg-gray-200">
          <BarChart2 className="w-5 h-5 mr-2" />
          Analysis
        </a>
      )}
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
        <Workflow className="w-5 h-5 mr-2" />
        Workflow
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
        <ListTodo className="w-5 h-5 mr-2" />
        Tasks
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
        <Users className="w-5 h-5 mr-2" />
        User Management
      </a>
      <a
        href="#"
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
        <Settings className="w-5 h-5 mr-2" />
        Settings
      </a>
    </nav>
  )

  return (
    (<div className="flex h-screen bg-gray-100">
      <header
        className="fixed top-0 left-0 right-0 bg-white shadow z-20 flex items-center justify-between">
        <div className="py-4 px-4 sm:px-6 lg:px-8 flex items-center">
          <Search className="h-8 w-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">trace.ai</h1>
        </div>
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <UserCircle className="h-8 w-8 text-gray-500" />
        </div>
      </header>
      {/* Left Sidebar - Admin Dashboard */}
      <div className="fixed left-0 top-0 bottom-0 z-10 w-64 bg-white shadow-md">
        {renderNavigation()}
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col mt-16 ml-64">
        {currentView === "main" ? renderMainView() : (
          <AnalysisView
            selectedDocument={selectedDocument}
            messages={messages}
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            onBack={handleBackToHome}
          />
        )}
      </div>
      {/* Right Sidebar - Chat/Progress */}
      <div className="w-80 bg-white shadow-md">
        <div className="p-4 border-b mt-16">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2 text-blue-500" />
            Audit Progress
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Risk Level Summary</h3>
              {Object.entries(getRiskLevelCounts()).map(([level, count]) => (
                <div key={level} className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600 flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2  ${
                        level === "Low" ? "bg-blue-500" :
                        level === "Medium" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                    {level}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              ))}
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-700">Total</span>
                <span className="text-sm font-medium text-gray-900">{documents.length}</span>
              </div>
            </div>
            <Separator className="my-4" />
            {progress.length === 0 ? (
              <p className="text-gray-500">Upload a document to start the audit process.</p>
            ) : (
              progress.map((step, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center">
                    {step.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                    )}
                    <p className="text-sm text-gray-800">{step.text}</p>
                  </div>
                  {index < progress.length - 1 && <Separator className="my-2" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>)
  );
}
