import React from "react";

import CommitteeList from "./committeeList";
import LoadingOrError from "../loadingError";

import useApiGet from "../../../hooks/useApiGet";

const CommitteeListPage = props => {
  const { heading, url, auth } = props;
  const [data, isLoading, apiFailed] = useApiGet(url, auth);

  return (
    <>
      <section>
        <header className="page-heading">
          <h2>{heading}</h2>
        </header>
        <div className="page-body">
          <article>
            {apiFailed || isLoading ? (
              <LoadingOrError error={apiFailed} />
            ) : (
              <CommitteeList committees={data} />
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default CommitteeListPage;
