import { useState, useEffect, useRef, useContext } from "react";
import {
  MAIN_COLOR,
  MAX_VERTICAL_WIDTH,
  MAX_VERTICAL_HEIGHT,
  BACKGROUND_COLOR,
} from "@/constants";
import { Row, Col, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Content } from "@/App";
// css 的模組引入
import styles from "@/css/local.module.css";
import { NAVIBAR_SIZE } from "../../constants";
import { GlobalStateContext } from "@/App";
import { TermsAndPrivacyZh } from "@/components/i18n";
import LicenseInfo from "@/components/LICENSE";
const TermsAndPrivacy = () => {
  const { globalstate } = useContext(GlobalStateContext);
  const { scaleH, setScaleH, scaleV, setScaleV, isPortrait, setIsPortrait } =
    useContext(Content);

  const navigate = useNavigate();

  useEffect(() => {
    // 更換背景圖片及顏色
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = BACKGROUND_COLOR;
  }, []);

  const elementRef = useRef(null);
  const [distanceToBottom, setDistanceToBottom] = useState(0);
  useEffect(() => {
    // 函数用于计算元素到视口底部的距离
    const calculateDistanceToBottom = () => {
      if (elementRef.current) {
        const elementRect = elementRef.current.getBoundingClientRect();
        const distance = window.innerHeight - elementRect.bottom;
        setDistanceToBottom(distance);
      }
    };
    // 初始化计算一次距离
    calculateDistanceToBottom();
  }, []);

  const backLogin = () => {
    navigate("/Login");
  };

  // 做到中間對齊的步驟
  // 先取得元件的尺寸再計算maginTop的值, 記得要減Head的尺寸
  return (
    <div className="relative flex h-dvh   w-dvw items-center justify-center  bg-[#EFEFEF] pt-[57rem] text-darkColor  opacity-[.8]">
      {/* 子 */}

      <div
        style={{
          height: "90%", // 這個height可能要有
          width: "calc(330rem)",

          border: `3rem solid ${MAIN_COLOR}`,
        }}
        className=" overflow-auto bg-white p-[calc(13rem)] text-[calc(14rem)]"
      >
        {" "}
        {globalstate === "en" ? (
          <span>
            <p className="text-[14rem] font-bold  ">
              Terms of Service and Privacy Policy{" "}
            </p>
            <p className="text-[12rem] font-semibold italic ">
              {" "}
              Last Updated: October 2024{" "}
            </p>
            <br></br>
            <p className="text-[14rem] font-bold "> Introduction </p>
            <div>
              SportsArt PowrPlus is a platform provided by SportsArt.com that
              allows users to track, manage, and share fitness activities
              through its website and mobile application. These Terms of Service
              ("Terms") govern your use of PowrPlus, and also include our
              Privacy Policy.{" "}
            </div>
            <br></br>
            <div>
              By accessing or using the PowrPlus service ("Service"), you agree
              to comply with these Terms and confirm that you have read,
              understood, and accepted the Privacy Policy. If you do not agree
              to these Terms, you do not have the right to use the Service.
              These Terms may be modified at any time, and continued use of the
              Service after changes constitutes your acceptance of those
              changes.{" "}
            </div>
            <br></br>
            <div className="text-[14rem] font-bold">Use of the Service</div>
            <div>
              The Service includes various forms of digital content ("Content"),
              such as software, text, images, and data, which are protected by
              copyright law. Unless permitted by these Terms, you may not use
              this Content. Any unauthorized use, including the sale or copying
              of Content, will result in immediate termination of your access to
              the Service.{" "}
            </div>
            <br />
            <div>
              Third-party trademarks and content provided via links on PowrPlus
              are not endorsed by SportsArt. You are responsible for how you use
              these external contents and may not use third-party trademarks
              without authorization. The Service is for personal use only;
              commercial use is prohibited unless explicitly authorized by
              SportsArt. Prohibited activities include, but are not limited to,
              unsolicited email collection and the use of web scraping
              technologies.{" "}
            </div>
            <br></br>
            <div className="text-[14rem] font-bold">Age Restriction</div>
            <div>
              You must be at least 13 years old to use the Service. If it is
              discovered that you are under 13 years old, your account will be
              terminated without notice.
            </div>
            <br></br>
            <div className="text-[14rem] font-bold">Termination</div>
            <div>
              SportsArt reserves the right to terminate your access to the
              Service at any time for any reason, including for violations of
              these Terms.{" "}
            </div>
            <br></br>
            <br></br>
            <div className="text-[14rem] font-bold">
              PowrPlus Privacy Policy{" "}
            </div>
            <br></br>
            <div className="text-[14rem] font-bold">Information Collection</div>
            <div>
              SportsArt may collect various types of information through the
              PowrPlus platform, including:{" "}
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Personal Data: Including name, email, phone number, IP address,
                device identifiers, location data, and fitness information
                (e.g., height, weight).{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Device and Browsing Data: Including operating system, browser
                type, pages accessed, and transaction details.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Automatic Collection: Data collected through cookies, web
                beacons, and location services integrated with PowrPlus fitness
                equipment.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Third-Party Data: Information collected from partners and
                service providers.{" "}
              </li>
            </ul>
            <div className="font-bold  ">How We Collect Information </div>
            <div className="font-bold  ">
              SportsArt collects information through:
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Direct Collection: Information provided directly by you through
                forms on the website or app, such as account creation or
                customer support interactions.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Automatic Collection: Data collected via cookies and other
                tracking technologies that monitor your browsing behavior.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Third Parties: Information from partners or service providers
                involved in delivering the service.{" "}
              </li>
            </ul>
            <div className="font-bold  ">Use of Information</div>
            <div className="font-bold  ">Your information may be used to: </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Provide and improve PowrPlus services.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Respond to inquiries and manage your account.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Communicate updates and notifications.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Analyze usage patterns to enhance user experience.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Share information with SportsArt's partners and service
                providers as necessary.{" "}
              </li>
            </ul>
            <div className="font-bold  ">Information Disclosure</div>
            <div className="font-bold  ">
              SportsArt does not sell personal data to third parties. However,
              we may disclose information:
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                To contractors and service providers who assist in operating
                PowrPlus.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                During business transactions (e.g., mergers or acquisitions).{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                To comply with legal obligations, such as responding to court
                orders or law enforcement requests.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                To protect the rights, property, or safety of SportsArt or other
                users.{" "}
              </li>
            </ul>
            <div className="font-bold  ">Data Security and Privacy</div>
            <div className="font-bold  ">
              We are committed to ensuring the security of user data and have
              implemented a range of technical and organizational measures to
              protect your personal information, including:
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Encryption: Using standard encryption technologies (e.g.,
                SSL/TLS) to protect data in transit.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Access Control: Restricting access to personal data to
                authorized personnel only in specific situations.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Data Breach Notification: Notifying affected users and relevant
                regulatory authorities in the event of a data breach as required
                by applicable laws.{" "}
              </li>
            </ul>
            <div className="font-bold  ">Data Retention and Deletion</div>
            <div className="font-bold ">
              We retain and delete user data based on the following criteria:{" "}
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Retention Period: We retain personal data only for as long as
                necessary to provide the service, unless a longer retention
                period is required by law. Typically, data will be automatically
                deleted after a period of account inactivity.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Deletion Requests: You may request the deletion of personal
                information at any time. Please submit requests through our
                website or customer service channels, and we will process and
                confirm the deletion within a reasonable time frame, unless
                there are legal or legitimate business reasons to retain the
                data.{" "}
              </li>
            </ul>
            <div className="font-bold  ">
              User Responsibilities and Disclaimers
            </div>
            <div className="font-bold  ">
              {" "}
              Users are responsible for all activities associated with their
              accounts, including:
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Account Security: Users must keep their account login
                information confidential and prevent unauthorized access.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Service Interruptions and Liability Limitations: While we strive
                to ensure stable service, SportsArt is not liable for losses
                resulting from service interruptions due to uncontrollable
                factors (e.g., natural disasters, cyber-attacks).{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                User Responsibility: Users agree to comply with these Terms, use
                the Service legally and reasonably, and be responsible for any
                violations of these Terms or the law.{" "}
              </li>
            </ul>
            <div className="font-bold ">Children's Privacy and Protection</div>
            <div className="font-bold ">
              {" "}
              We comply with the Children's Online Privacy Protection Act
              (COPPA) and take the following measures:{" "}
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Age Restriction: Children under 13 are not permitted to use our
                services. If we discover an account belonging to a user under
                13, we will immediately terminate the account and delete the
                relevant data.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Parental Consent: If the platform allows registration for
                children under 13, we will obtain parental or guardian consent
                to ensure compliance with legal requirements.{" "}
              </li>
            </ul>
            <div className="font-bold  ">
              Dispute Resolution and Arbitration
            </div>
            <div className="font-bold  ">
              {" "}
              If legal disputes arise between you and us, we will use the
              following mechanisms to resolve them:
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Arbitration Clause: We encourage users to resolve disputes
                through arbitration rather than legal action. Specific
                arbitration details will be determined based on the laws of your
                location.{" "}
              </li>
              <li style={{ listStyle: "disc" }}>
                Class Action Waiver: Users agree to waive claims made in a class
                action format; all disputes should be resolved on an individual
                basis.{" "}
              </li>
            </ul>
            <div className="font-bold  ">Update Notifications</div>
            <div className="font-bold  ">
              {" "}
              We may update the Terms of Service and Privacy Policy from time to
              time. When changes occur, we will notify you via:
            </div>
            <ul className="mb-[10rem] ml-[20rem] mt-[10rem]">
              <li style={{ listStyle: "disc" }}>
                Notification Methods: Email, in-app notifications, or
                announcements on our website. Continued use of the Service
                indicates your acceptance of the modified Terms.{" "}
              </li>
            </ul>
            <div className="font-bold  ">Conclusion</div>
            <div className="">
              {" "}
              By continuing to use SportsArt PowrPlus, you confirm your
              acceptance of these Terms of Service and Privacy Policy. If you
              have any questions or concerns, please contact us through the
              appropriate channels on the platform.
            </div>
            <details className="mt-[30rem]">
              <summary>Legal Information</summary> <LicenseInfo />
            </details>
          </span>
        ) : (
          <TermsAndPrivacyZh />
        )}
      </div>
    </div>
  );
};

export default TermsAndPrivacy;
