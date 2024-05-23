const Loader = ({is}:{is?:boolean}) => (
    <div className={`${is?'flex justify-center items-center h-[80vh] ':''} w-full`}>
      <img
        src={`/assets/loader${is?'2':''}.svg`}
        alt="loader"
        width={is?100:24}
        height={is?100:24}
        className={`animate-spin`}
      />
    </div>
  );
  
  export default Loader;