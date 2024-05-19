const Loader = ({is}:{is?:boolean}) => (
    <div className="flex-center w-full">
      <img
        src={`/assets/loader${is?'2':''}.svg`}
        alt="loader"
        width={24}
        height={24}
        className={`animate-spin ${is?'scale-4':''}`}
      />
    </div>
  );
  
  export default Loader;