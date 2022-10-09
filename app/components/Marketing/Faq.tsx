import { Container } from "~/components/Marketing/Container";
// import backgroundImage from "~/images/background-faqs.jpg";

const faqs = [
  [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer: "Absolutely, we are happy to take your money in all forms.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam",
    },
  ],
  [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam.",
    },
  ],
  [
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "You just tell us what data you need a report for, and we get our kids to create beautiful charts for you using only the finest crayons.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam.",
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam",
    },
  ],
];

export default function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit totam
            dolor aspernatur officiis accusantium, commodi, minus debitis
            mollitia necessitatibus cumque quam quisquam sint, non explicabo a?
            Veniam ea reiciendis minus.
          </p>
        </div>
        <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
