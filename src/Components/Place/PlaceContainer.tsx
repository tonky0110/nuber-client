import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries";
import { editPlace, editPlaceVariables } from "../../types/api";
import PlacePresenter from "./PlacePresenter";
import { EDIT_PLACE } from "./PlaceQueries";

class FavMutation extends Mutation<editPlace, editPlaceVariables> {}

interface IProps {
  id: number;
  fav: boolean;
  name: string;
  address: string;
}
class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { fav, name, address, id } = this.props;

    return (
      <FavMutation
        mutation={EDIT_PLACE}
        variables={{ isFav: !fav, placeId: id }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceFn => (
          <PlacePresenter
            onStartPress={editPlaceFn}
            fav={fav}
            address={address}
            name={name}
          />
        )}
      </FavMutation>
    );
  }
}

export default PlaceContainer;
