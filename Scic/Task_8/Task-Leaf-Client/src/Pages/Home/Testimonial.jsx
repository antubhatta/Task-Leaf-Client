const ReviewSection = () => {
    const reviews = [
      {
        id: 1,
        author: 'John Doe',
        occupation: 'Banker',
        content: 'I\'ve found incredible opportunities and inspiration on this platform. The community is supportive, and the contests are diverse and challenging.',
        image: 'https://i.ibb.co/89qFF3V/four.webp', 
      },
      {
        id: 2,
        author: 'Jane Smith',
        occupation: 'HR',
        content: 'As a writer, I appreciate the variety of contests available. It\'s a great way to showcase my work, and the feedback from other participants is invaluable.',
        image: 'https://i.ibb.co/TtTzf4s/three.jpg', 
      },
      {
        id: 3,
        author: 'Alex Johnson',
        occupation: 'Web Developer',
        content: 'Joining WinWave was a game-changer for me. I\'ve not only improved my skills but also made connections that have led to exciting collaborations.',
        image: 'https://i.ibb.co/h7pQV2N/two.jpg', 
      },
    ];
  
    return (
      <section className="bg-gray-100 py-16 mt-10 lg:mt-20 ">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 px-6 lg:px-0 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white  p-6 rounded-md shadow-lg">
                <div className="mb-4">
                  <img
                    src={review.image}
                    alt={`${review.author} - ${review.occupation}`}
                    className="w-20 h-20 object-cover rounded-full mx-auto"
                  />
                </div>
                <p className="text-gray-700 mb-4">{review.content}</p>
                <p className="text-gray-800 font-semibold">{review.author}</p>
                <p className="text-gray-600">{review.occupation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ReviewSection;