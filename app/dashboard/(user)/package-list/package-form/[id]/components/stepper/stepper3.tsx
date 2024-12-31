import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Step3Props {
  isCount: number;
  isInvoiceId: string | null;
}

const Step3 = ({ isCount, isInvoiceId }: Step3Props) => {
  const router = useRouter();

  // console.log("redirect", isInvoiceId);

  useEffect(() => {
    if (isCount === 0) {
      router.push(`/dashboard/invoice/detail/${isInvoiceId}`);
    }
  }, [isCount]);

  return (
    <div className="flex flex-col justify-center items-center pt-8 pb-28">
      <DotLottieReact className="w-84 h-64" src="https://lottie.host/0e093854-681f-4d6c-8290-f204b005a0d5/52ToHqZnIe.lottie" loop autoplay />
      <h1 className="text-4xl font-medium mb-4">Thank Your For Your Order!</h1>
      <p className="text-md text-zinc-400">You will be redirected to the transaction page in {isCount} seconds.</p>
    </div>
  );
};

export default Step3;
