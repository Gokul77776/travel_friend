export default function BackgroundAnimation() {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-l from-[#8f94fb] to-[#4e54c8] -z-10">
        <ul className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Animated Circles */}
          <li className="animate-circle left-[25%] w-[80px] h-[80px]"></li>
          <li className="animate-circle left-[10%] w-[20px] h-[20px] animate-[animate_12s_linear_infinite_2s]"></li>
          <li className="animate-circle left-[70%] w-[20px] h-[20px] animate-[animate_25s_linear_infinite_4s]"></li>
          <li className="animate-circle left-[40%] w-[60px] h-[60px] animate-[animate_18s_linear_infinite]"></li>
          <li className="animate-circle left-[65%] w-[20px] h-[20px]"></li>
          <li className="animate-circle left-[75%] w-[110px] h-[110px] animate-[animate_25s_linear_infinite_3s]"></li>
          <li className="animate-circle left-[35%] w-[150px] h-[150px] animate-[animate_25s_linear_infinite_7s]"></li>
          <li className="animate-circle left-[50%] w-[25px] h-[25px] animate-[animate_45s_linear_infinite_15s]"></li>
          <li className="animate-circle left-[20%] w-[15px] h-[15px] animate-[animate_35s_linear_infinite_2s]"></li>
          <li className="animate-circle left-[85%] w-[150px] h-[150px] animate-[animate_11s_linear_infinite]"></li>
        </ul>
      </div>
    );
  }
  