const Card = ({ title, value }) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="text-gray-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    );
  };
  
  export default Card;
  