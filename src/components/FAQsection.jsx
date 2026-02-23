import { useState } from "react"
import "../styles/faq.css"

function FAQsection() {

  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Is my donation eligible for 80G tax exemption?",
      answer: "Yes. ISKCON Visakhapatnam is a registered charitable trust under Section 80G of the Income Tax Act. You will receive a tax exemption certificate via email within 24 hours of your donation."
    },
    {
      question: "How exactly are meals distributed?",
      answer: "Our volunteer team prepares meals fresh every day in ISKCON's FSSAI-certified temple kitchens. The food is first offered to Lord Krishna as prasadam, then hygienically packed and distributed at 15+ government hospitals across Visakhapatnam to caregivers and families of patients."
    },
    {
      question: "Can I set up a monthly recurring donation?",
      answer: "Absolutely! Use the Monthly Donation toggle on the donation card. Monthly donors are the backbone of our program — your recurring support helps us plan and serve consistently without gaps."
    },
    {
      question: "Will I receive proof of how my donation was used?",
      answer: "Yes! All donors are invited to our WhatsApp group where we share daily distribution photos, beneficiary counts, and ground-level stories. We also publish annual audited financial reports publicly."
    },
    {
      question: "Who are the beneficiaries of this program?",
      answer: "We serve caregivers, family members, and attendants who accompany patients at government hospitals. These are often people from rural areas who travel long distances and cannot afford to eat while waiting. We serve everyone regardless of caste, creed, or background."
    }
  ]

  const toggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null)
    } else {
      setOpenIndex(index)
    }
  }

  return (
    <section className="faq">

      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">

        {faqs.map((item, index) => (
          <div className="faq-item" key={index}>

            <div className="faq-question" onClick={() => toggle(index)}>
              <span>{item.question}</span>
              <span>{openIndex === index ? "−" : "⌄"}</span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  )
}

export default FAQsection
