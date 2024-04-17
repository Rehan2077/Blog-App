import { Link } from "react-router-dom";

const FAQ = () => {
  return (
    <section className="container mx-auto flex flex-col flex-wrap gap-5 p-7">
      <div>
        <h2 className="text-2xl font-bold text-dark-hard">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-lg text-dark-soft">
          Find answers to commonly asked questions about Devblog. If you can't
          find the information you're looking for, please{" "}
          <Link to="/contact-us" className="text-blue-400 hover:text-primary">
            contact us
          </Link>
          .
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-dark-hard">
          General Questions
        </h3>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            <strong>What is Devblog?</strong>
            <br />
            Devblog is your go-to platform for everything related to web
            development, software engineering, and technology trends. We provide
            high-quality, insightful, and practical content to help developers
            at all levels grow and succeed.
          </li>
          <li>
            <strong>When was Devblog founded?</strong>
            <br />
            Devblog was founded in 2024.
          </li>
          <li>
            <strong>Is Devblog open source?</strong>
            <br />
            Yes, Devblog is an open-source platform. We welcome contributions
            from the community to help improve and expand our content.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-dark-hard">
          Content & Contributions
        </h3>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            <strong>Can I contribute articles to Devblog?</strong>
            <br />
            Absolutely! We encourage developers, writers, designers, and
            enthusiasts to contribute articles. Please reach out to our team at{" "}
            <a
              href="mailto:joinus@devblog.com"
              className="text-blue-400 hover:text-primary"
            >
              joinus@devblog.com
            </a>{" "}
            for more information.
          </li>
          <li>
            <strong>How can I submit my article?</strong>
            <br />
            You can submit your article by sending it to{" "}
            <a
              href="mailto:submit@devblog.com"
              className="text-blue-400 hover:text-primary"
            >
              submit@devblog.com
            </a>
            . Please make sure to follow our{" "}
            <span className="text-blue-400 hover:text-primary">
              submission guidelines
            </span>{" "}
            before sending your content.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-dark-hard">
          Account & Membership
        </h3>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            <strong>Do I need to create an account to read articles?</strong>
            <br />
            No, you can freely browse and read articles on Devblog without
            creating an account. However, creating an account allows you to
            comment, bookmark articles, and receive updates.
          </li>
          <li>
            <strong>How can I delete my account?</strong>
            <br />
            To delete your account, please contact our support team at{" "}
            <a
              href="mailto:support@devblog.com"
              className="text-blue-400 hover:text-primary"
            >
              support@devblog.com
            </a>
            .
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-dark-hard">
          Technical Issues
        </h3>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            <strong>
              I'm experiencing issues with the website. What should I do?
            </strong>
            <br />
            If you encounter any technical issues or have questions about our
            platform, please reach out to our support team at{" "}
            <a
              href="mailto:support@devblog.com"
              className="text-blue-400 hover:text-primary"
            >
              support@devblog.com
            </a>
            .
          </li>
          <li>
            <strong>How do I report a bug or suggest a feature?</strong>
            <br />
            You can report bugs or suggest new features by emailing us at{" "}
            <a
              href="mailto:feedback@devblog.com"
              className="text-blue-400 hover:text-primary"
            >
              feedback@devblog.com
            </a>
            . We appreciate your input and strive to improve our platform based
            on user feedback.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-dark-hard">
          Contact & Support
        </h3>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            <strong>How can I contact Devblog for further assistance?</strong>
            <br />
            For any additional questions or concerns, feel free to contact us at{" "}
            <a
              href="mailto:contact@devblog.com"
              className="text-blue-400 hover:text-primary"
            >
              contact@devblog.com
            </a>{" "}
            or call us at{" "}
            <a
              href="tel:+91 829-878-8591"
              className="text-blue-400 hover:text-primary"
            >
              +91 829-878-8591
            </a>
            .
          </li>
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
