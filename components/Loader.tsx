import Image from 'next/image';

const Loader = () => {
  return (
    <div className="z-40 flex justify-center items-center h-[calc(100vh-300px)] w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};
export default Loader;
