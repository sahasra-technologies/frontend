// import Layout from "@/components/Layout";

export default function CancellationRefund() {
  return (
    <>
      <article className="py-16 px-4">
        <div className="flex items-center gap-2 mb-6 md:hidden">
          <img
            src="/Play_primary.svg"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-sports-blue bg-clip-text text-transparent">
            PlayDate
          </span>
        </div>
        <div className="container max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">Cancellation and Refund policy</h1>
          </div>

          {/* Introduction */}
          <section className="mb-12 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Cancellations are subject to the policy as set by the respective merchant partner. You can view the cancellation policies of the respective merchant partner on their information page prior to making a booking or purchase. The cancellation policy is also included in your booking ticket in your order history.
            </p>

            <p>
              Cancellations can be initiated by the users themselves on your booking ticket. The refund amount due will be displayed prior to seeking confirmation of the cancellation. The refund amount will be credited back into the user’s account, to the same source through which the payment was made, within 5-7 working days, post initiating the cancellation.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
