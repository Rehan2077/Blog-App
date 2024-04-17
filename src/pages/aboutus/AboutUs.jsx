import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="container mx-auto flex flex-col flex-wrap gap-5 p-7">
      <h2 className="text-2xl font-bold text-dark-hard">About Us</h2>
      <div>
        <h3 className="text-xl font-bold text-dark-soft">Who We Are</h3>
        <p className=" text-lg text-dark-thin">
          Welcome to DevBlog, your go-to platform for everything related to
          software engineering, development, science, medical advancements,
          arts, and more. Founded in 2024, we are passionate about exploring the
          ever-evolving world of technology and its intersection with various
          domains. Our mission is to provide high-quality, insightful, and
          practical content to help enthusiasts, professionals, and curious
          minds alike grow, learn, and succeed.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold text-dark-soft">
          Open Source Community
        </h3>
        <p className=" text-lg text-dark-thin">
          At DevBlog, we believe in the power of community and collaboration. We
          are proud to be an open-source platform, inviting users from around
          the world to join our team and contribute to our growing repository of
          knowledge. Whether you're a developer, a researcher, an artist, or
          simply someone with a passion for sharing knowledge, we welcome you to
          join our community and help us create valuable content for our
          audience.
        </p>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold text-dark-soft">What We Offer</h3>
        <div>
          <h4 className="text-lg font-bold text-dark-soft">
            Articles & Tutorials
          </h4>
          <p className="text-lg text-dark-thin">
            Explore our extensive library of articles and tutorials covering a
            wide range of topics, including:
          </p>
          <ul className="flex list-disc flex-col px-5 py-2  text-[1.1rem] text-dark-thin">
            <li>Software Engineering</li>
            <li>Computer Science</li>
            <li>Medical Science</li>
            <li>Arts</li>
            <li>Legal Studies</li>
            <li>Commerce</li>
            <li>And many more...</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-dark-soft">
            Community & Engagement
          </h4>
          <p className="text-lg text-dark-thin">
            Join our community of passionate developers, share your insights,
            ask questions, and collaborate on projects in our interactive forums
            and comment sections.
          </p>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold text-dark-soft">Meet Our Team</h3>
        <ul className="flex list-disc flex-col px-5 py-2  text-[1.1rem] text-dark-thin">
          <li>
            <h4 className="text-[1.25rem] font-bold text-dark-soft ">
              Rehan Fazal - Founder, Developer & Maintenance Engineer
            </h4>
            <p className="text-lg text-dark-thin">
              Rehan Fazal is the visionary behind DevBlog, bringing both ideas
              and coding expertise to the platform. With a keen eye for detail
              and a passion for technology, Rehan ensures that DevBlog remains
              at the forefront of diverse topics, from web development to
              medical innovations. From ideation to maintenance, Rehan's
              dedication drives the platform's growth and success.
            </p>
          </li>
          <li>
            <h4 className="mt-2 text-[1.25rem] font-bold  text-dark-soft">
              Aditi Singh - UI Designer & Content Writer
            </h4>
            <p className="text-lg text-dark-thin">
              Aditi Singh is the creative force behind DevBlog's captivating
              user interface and engaging content. With a background in design
              and a flair for writing, Aditi crafts visually appealing and
              informative content that resonates with our audience across
              various domains. Her innovative designs and compelling narratives
              enhance the user experience and bring DevBlog's content to life.
            </p>
          </li>
          <li>
            <h4 className="mt-2 text-[1.25rem] font-bold  text-dark-soft">
              Rahul Kr Yadav - Researcher & Community Assistant
            </h4>
            <p className="text-lg text-dark-thin">
              Rahul Kr Yadav plays a crucial role in DevBlog's content strategy,
              conducting in-depth research to ensure the accuracy and relevance
              of our articles and tutorials across diverse topics. As a
              dedicated helper, Rahul assists in various aspects of the
              platform, contributing to its growth and providing valuable
              support to the team and community.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-dark-soft">Join Us</h3>
        <p className=" text-lg text-dark-thin">
          Are you passionate about web development and technology? Do you have
          valuable insights, knowledge, or experiences you'd like to share with
          our community? We'd love to hear from you!{" "}
          <Link
            to={"/contact-us"}
            className="text-blue-500 underline hover:text-primary"
          >
            Contact Us
          </Link>{" "}
          to learn more about contributing to DevBlog.
        </p>
      </div>
    </section>
  );
};
export default AboutUs;
