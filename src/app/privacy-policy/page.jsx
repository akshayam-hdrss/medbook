import Link from "next/link";

export default function Page() {
  return (
    <div className="lg:px-20 px-8 lg:py-10 py-8">
    <div className="flex justify-start pb-5">
        <Link href="/" className="hover:underline text-sm underline-offset-2">Back to Home</Link>
    </div>
    <h1 className="text-2xl font-semibold text-kaavi">Privacy Policy</h1>
      <p className="text-justify pt-5">
        Welcome to Partner! By accessing or using our platform, you agree to
        these Terms and Conditions. Partner is a social app that allows users to
        get information about shop owners, contact them, read daily city news,
        and order products from vendors through a small e-commerce system. Users
        must be at least 18 years old to access our services. Partner serves as
        a platform to connect users with vendors, and we do not guarantee the
        accuracy, quality, availability, or legitimacy of the information,
        products, or services listed. Vendors are responsible for ensuring the
        authenticity of their business details and listings. Orders placed
        through Partner are fulfilled by independent vendors, and we are not
        responsible for product quality, delivery, refunds, or disputes arising
        from transactions. Payments made through Partner are processed via
        third-party gateways, and we do not store any sensitive payment details.
        Any fraudulent activities, misleading content, or misuse of the platform
        for illegal purposes will result in account suspension or termination.
        News and updates provided on Partner are for informational purposes
        only, and we do not guarantee their accuracy or reliability. Partner is
        not liable for any damages, losses, or disputes resulting from the use
        of our services. By using Partner, you agree to our Privacy Policy,
        which outlines how we collect, store, and use your data. We reserve the
        right to update these Terms at any time, and continued use of our
        platform signifies acceptance of any changes. These Terms shall be
        governed by the laws of India, and any disputes will be resolved through
        arbitration or legal proceedings in Your Jurisdiction. If you have any
        questions or concerns, please contact us at <span className="font-semibold">Admin@partner.ind.in</span> By
        using Partner, you acknowledge that you have read, understood, and
        agreed to these Terms and Conditions.
      </p>
    </div>
  );
}
