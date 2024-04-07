import style from "./index.module.scss";

type LoaderProps = {
  size: number;
};

export default function Loader({ size }: LoaderProps) {
  return (
    <div
      className={style.loader}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
