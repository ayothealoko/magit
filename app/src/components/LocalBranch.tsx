import SearchAndClick from "./SearchAndClick";

function LocalBranch(): JSX.Element {
  return (
    <SearchAndClick
      breadCrumb="branch / local branch"
      header="checkout a branch"
      list={["main", "developer", "develop", "feature-1", "feature develop"]}
    />
  );
}

export default LocalBranch;
