export default function NewsletterSignup() {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
      <p className="text-muted-foreground mb-6">
        Subscribe to our newsletter for sustainable travel tips, destination guides, and exclusive offers.
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          required
          className="flex-grow px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
