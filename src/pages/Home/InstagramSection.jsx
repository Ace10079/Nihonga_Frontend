const InstagramSection = () => {
    return (
      <section className="bg-gray-100 py-10 relative overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-6">Follow Us On Instagram</h2>
        <div className="flex justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-5xl rounded-xl shadow-lg object-cover"
          >
            <source src="/video 2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    );
  };
  
  export default InstagramSection;
  