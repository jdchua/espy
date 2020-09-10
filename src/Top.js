import React from "react"
import axios from "axios"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ModalImage from "react-modal-image";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

class Top extends React.Component {
    constructor(props){
        super()
        this.state = {
          images: [],
          titles: [],
          searchTerm: ""
        }
    }

     getInfo = () => {
        axios.get(`https://www.reddit.com/r/${this.state.searchTerm}/top.json?&sort=top&t=all`)
        .then(({ data }) => {
            const images = data.data.children.reduce(function(filtered, option){
              if (option.data.post_hint === "image" && filtered.length <= 3) {
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
        if (prevState.searchTerm !== this.state.searchTerm) {
          this.getInfo();
        }
    }
      
    render (){
        return (
          <div>
            <h3 className="typePosts" style={{display: this.state.searchTerm !== "" ? "block" : "none" }}>Top Posts<TrendingUpIcon className="topIcon"/></h3>
            <div className="root">
              <GridList spacing={7} cellHeight={160} className="gridList" cols={5}>
                {this.state.images.map((tile) => (
                  <GridListTile cols={tile.cols || 2.5} rows={2}>
                    <ModalImage
                        className="topImages"
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

export default Top