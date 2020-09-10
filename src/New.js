import React from "react"
import axios from "axios"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ModalImage from "react-modal-image";
import NewReleasesIcon from '@material-ui/icons/NewReleases';

class New extends React.Component {
    constructor(props){
        super()
        this.state = {
          images: [],
          titles: [],
          searchTerm: ""
        }
    }

     getInfo = () => {
        axios.get(`https://www.reddit.com/r/${this.state.searchTerm}/new.json?&sort=top&t=all`)
        .then(({ data }) => {
            const images = data.data.children.reduce(function(filtered, option){
              if (option.data.post_hint === "image" && filtered.length <= 5) {
                filtered.push (option.data)
              }
              return filtered;
            }, []);
            const titles = images.map(item => item.title)
            this.setState({
                 images: [...images],
                 titles: [...titles]
            })
        })
     }

    static getDerivedStateFromProps(props, state) {
      return {searchTerm: props.searchTerm};
    }

    componentDidUpdate(prevProps, prevState) {
      console.log(prevProps.searchTerm)
      if (prevState.searchTerm !== this.state.searchTerm) {
        this.getInfo();
      }
    }

    render (){
        return (
          <div>
            <h3 className="typePosts" style={{display: this.state.searchTerm !== "" ? "block" : "none" }}>New Posts<NewReleasesIcon className="newIcon"/></h3>
            <div className="root">
              <GridList spacing={7} cellHeight={160} className="gridListImgs" cols={2} rows={3}>
                {this.state.images.map((tile, index) => (
                  <GridListTile cols={tile.cols || 1} rows={1.5}>
                    <ModalImage
                        className="newImages"
                        small={tile.url}
                        large={tile.url}
                    />               
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
        )
    }
}

export default New