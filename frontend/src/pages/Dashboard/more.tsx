import cogoToast from "cogo-toast";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components";
import { UILoader } from "../../components/loaders";
import { instance } from "../../config";
import useSWR from "swr";
import chef from "../../assets/chef.png";

export const More = () => {
  const params = useParams().id;
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe/" + params, fetcher, {
    suspense: true,
  });

  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }

  return (
    <Suspense fallback={<UILoader />}>
      <div className="flex items-center justify-center m-auto">
        <Card
          isFull={true}
          id={data?._id}
          title={data?.title}
          image={data?.image?.url}
          ingredients={data?.ingredients}
          note={data?.note}
          description={data?.description}
          email={data?.user?.email}
          avatar={chef}
        />
      </div>
    </Suspense>
  );
};