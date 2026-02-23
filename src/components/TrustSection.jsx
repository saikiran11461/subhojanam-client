import "../styles/trust.css"

function TrustSection() {
  return (
    <section className="trust">

      <h2>100% Transparent. 100% Tax Exempt.</h2>
      <p className="trust-sub">
        We believe in absolute accountability. Here is how we protect your contribution.
      </p>

      <div className="trust-cards">

        <div className="trust-card">
          <div className="icon-circle">📄</div>
          <h3>80G Tax Benefits</h3>
          <p>
            All donations are eligible for 50% tax exemption under Section 80G
            of the Income Tax Act. You will receive your tax certificate instantly.
          </p>
        </div>

        <div className="trust-card">
          <div className="icon-circle">🏛</div>
          <h3>Government Registered</h3>
          <p>
            Registered Public Charitable Trust, fully compliant with all CSR
            and government regulations.
          </p>
        </div>

        <div className="trust-card">
          <div className="icon-circle">📊</div>
          <h3>Audited Financials</h3>
          <p>
            Our books are audited annually by independent Chartered
            Accountants. We publish every report for public view.
          </p>
        </div>

        <div className="trust-card">
          <div className="icon-circle">🛡</div>
          <h3>Bank-Grade Security</h3>
          <p>
            Your transaction is secured with 256-bit SSL encryption.
            We use industry-standard payment gateways to keep your data safe.
          </p>
        </div>

      </div>

    </section>
  )
}

export default TrustSection
