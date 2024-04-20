
const ContactUs = () => {
  return (
    <section className="container mx-auto flex flex-col flex-wrap gap-5 p-7">
      <div>
        <h2 className="text-2xl font-bold text-dark-hard">Contact Us</h2>
        <p className="text-lg text-dark-soft">
          We're here to help and answer any question you might have. We look
          forward to hearing from you!
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-dark-hard">General Inquiries</h2>
        <p className="text-lg text-dark-soft">
          For general inquiries or feedback about NEXUS, please reach out to
          us at:
        </p>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            Email:{" "}
            <a
              href="mailto:contact@nexusblog.com"
              className="text-base text-blue-400 hover:text-primary"
            >
              contact@nexusblog.com
            </a>{" "}
          </li>
          <li>
            Phone:
            <a
              href="tel:+91-829-878-8591"
              className="text-base text-blue-400 hover:text-primary"
            >
              +91 829-878-8591
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-dark-hard">Support</h2>
        <p className="text-lg text-dark-soft">
          If you're experiencing any issues with our platform or have technical
          questions, our support team is ready to assist you:
        </p>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            Email:{" "}
            <a
              href="mailto:support@nexusblog.com"
              className="text-base text-blue-400 hover:text-primary"
            >
              support@nexusblog.com
            </a>{" "}
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-dark-hard">Join Our Team</h2>
        <p className="text-lg text-dark-soft">
          Interested in joining our dynamic team of contributors? We welcome
          developers, writers, designers, and enthusiasts from all backgrounds
          to collaborate with us. Here's how you can get involved:
        </p>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            Email:{" "}
            <a
              href="mailto:joinus@nexusblog.com"
              className="text-base text-blue-400 hover:text-primary"
            >
              joinus@nexusblog.com
            </a>{" "}
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-dark-hard">Social Media</h2>
        <p className="text-lg text-dark-soft">
          Stay connected with us through our social media channels for updates,
          announcements, and more:
        </p>
        <ul className="my-1 list-disc pl-5 text-[1.07rem] text-dark-soft">
          <li>
            <a className="text-base text-blue-400 hover:cursor-pointer hover:text-primary">
              Twitter
            </a>
          </li>
          <li>
            <a className="text-base text-blue-400 hover:cursor-pointer hover:text-primary">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="text-base text-blue-400 hover:cursor-pointer hover:text-primary">
              Instagram
            </a>
          </li>
          <li>
            <a className="text-base text-blue-400 hover:cursor-pointer hover:text-primary">
              Facebook
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};
export default ContactUs;
