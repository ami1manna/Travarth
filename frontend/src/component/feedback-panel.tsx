"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

export default function FeedbackPanel() {
  const [feedbackType, setFeedbackType] = useState("suggestions")
  const [description, setDescription] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you would typically send the feedback to your backend
    console.log({ feedbackType, description })

    // Show success toast
    toast({
      title: "Thank you for the feedback",
      description: "We appreciate your input and will review it shortly.",
    })

    // Reset form
    setDescription("")
    setFeedbackType("suggestions")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700 border-0 text-white"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open feedback form</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>We Value Your Feedback!</SheetTitle>
          <SheetDescription>Please take a moment to share your thoughts and help us improve.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="feedback-type">Feedback Type</Label>
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger id="feedback-type">
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suggestions">Suggestions</SelectItem>
                <SelectItem value="complaints">Complaints</SelectItem>
                <SelectItem value="questions">Questions</SelectItem>
                <SelectItem value="requests">Feature Requests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Message</Label>
            <Textarea
              id="description"
              placeholder="Tell us more about your feedback"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {description.length < 2 ? "String must contain at least 2 character(s)" : ""}
            </p>
          </div>

          <SheetClose asChild>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={description.length < 2}>
              Submit Feedback
            </Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  )
}
