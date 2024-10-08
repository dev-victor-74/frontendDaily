import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center mt-20 h-[300px]">
      <div className="w-full flex items-center justify-center">
        <Image
          src="/loading.png"
          height={30}
          width={30}
          alt="Loading..."
          className=" animate-spin "
        />
      </div>
    </div>
  );
};

export default Loading;
