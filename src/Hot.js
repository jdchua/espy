import React from "react"
import axios from "axios"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Avatar from '@material-ui/core/Avatar';
import 'react-responsive-modal/styles.css';
import ModalImage from "react-modal-image";
import WhatshotIcon from '@material-ui/icons/Whatshot';

class Hot extends React.Component {
    constructor(props){
        super()
        this.state = {
          images: [],
          titles: [],
          searchTerm: "",
          subreddit: "",
          subredditImg: [],
        }
    }

    getPic = () => {
        axios.get(`https://www.reddit.com/r/${this.state.searchTerm}/about.json`)
        .then(({ data }) => {
            this.setState({subredditImg: data.data.icon_img});
        })
    }
   
     getInfo = () => {
        axios.get(`https://www.reddit.com/r/${this.state.searchTerm}/hot.json?&sort=top&t=all`)
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
                 titles: [...titles],
                 subreddit: (data.data.children[0].data.subreddit).charAt(0).toUpperCase() + (data.data.children[0].data.subreddit).slice(1)
            })
        })
     }

    static getDerivedStateFromProps(props, state) {
      return {searchTerm: props.searchTerm};
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
          this.getInfo();
          this.getPic();
        }
      }
      
    render (){
        return (
          <div>
            <div className="subreddit_header" style={{display: this.state.searchTerm !== "" ? "flex" : "none" }}><h1>{this.state.subreddit} Subreddit</h1><Avatar className="subreddit_img" alt="profile pic" src={this.state.subredditImg}/></div>
            <h3 className="typePosts" style={{display: this.state.searchTerm !== "" ? "block" : "none" }}>Hot Posts<WhatshotIcon className="hotIcon"/></h3>
            <div className="root">
                <GridList spacing={7} className="gridList" cols={3} >
                    {this.state.images.map((tile, index) => (
                      <GridListTile rows={index === 0 ? 2 : 1} cols={index === 0 ? 3 : 1}>
                          <ModalImage
                            className={index !== 0 ? "hotImages" : "firstImage"}
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

export default Hot