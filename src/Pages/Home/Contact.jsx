import SectionTitle from '../../Components/SectionTitle/SectionTitle';

const Contact = () => {
    return (
        <div>
            <SectionTitle header={"Contact Us"} subtitle={"Join our team"}></SectionTitle>
            <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="bg-white rounded-2xl shadow-xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Left Side */}
      <div className="space-y-6">
        <div className="text-4xl font-bold text-blue-800">Get in Touch</div>
        <div className="text-gray-600">
          If you have any questions about our medical camp or want to volunteer, feel free to reach out. We're here to help!
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="text-lg font-semibold text-gray-800">medicalcamp@example.com</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="text-lg font-semibold text-gray-800">+88 0184 566 7890</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Address</div>
            <div className="text-lg font-semibold text-gray-800">
              Mirpur, Dhaka-Bnaglagesh
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Hours</div>
            <div className="text-lg font-semibold text-gray-800">
              Mon–Fri: 9:00 AM – 5:00 PM
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Boxed Message Area */}
      <div className="bg-blue-100 rounded-xl p-6 md:p-8 shadow-inner flex flex-col justify-center space-y-4">
        <div className="text-2xl font-semibold text-blue-900">Have a Message?</div>
        <div className="text-blue-800">
          We’d love to hear from you. Whether it’s a question, feedback, or you want to join our mission — reach out anytime.
        </div>
        <div className="text-sm text-blue-700">
          Email us directly or visit our camp office during working hours.
        </div>
      </div>

    </div>
  </div>
</div>
        </div>
    );
};

export default Contact;