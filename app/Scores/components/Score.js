// @flow
import React from 'react';
import styled from 'styled-components';
import MMSForm from './MMSForm';
import ScoreReferences from './ScoreReferences';
import ScoreResults from './ScoreResults';

class Score extends React.Component {

  defaultProps = {
    score: {
      title: '',
      subtitle: ''
    }
  };

  state = {
    score: 0
  };

  onChange = (score) => {
    console.log(score);
    this.setState({
      score
    })
  };

  render = () => (
    <div className={this.props.className}>
      <header>
        <h1>{this.props.score.title}</h1>
        <span>{this.props.score.subtitle}</span>
      </header>
      <main>
        <MMSForm onChange={this.onChange}/>
      </main>
      <aside>
        <div>
          <h3>Caractéristiques</h3>
          <div dangerouslySetInnerHTML={{ __html: this.props.score.characteristics }}/>
        </div>
        <ScoreResults instructions={this.props.score.instructions} score={this.state.score}/>
        <ScoreReferences references={this.props.score.references}/>

      </aside>
    </div>
  );
}
const StyledScore = styled(Score)`
  display: grid;
  grid-template-columns: [full-start] 2fr [aside-start] 1fr [full-end];
  grid-template-rows: [full-start] 3rem [main-start] 1fr [full-end];
  grid-row-gap: 1rem;
  line-height: 1.5rem;
  
  header {
    grid-column-start: full-start;
    grid-column-end: full-end;
    text-align: center;
    display: flex;
    padding: 1rem;
          color: #333333;

    flex-direction: row;
    font-size: large;
    h1 { margin: 0;     font-size: large;
    margin-right: 1rem;
  }
  }
  
  main {
    padding: 0 
  }
  
  aside {
    background: #fafafa;
    padding: 0 2rem;
    color: #333333cc;
    h3 {
      color: #333333;

    }
    ul {
      margin:0;
      padding: 0;
      list-style-type: none;
    }
  }
    
  
`;

export default StyledScore;


/*

    <Dialog open={this.state.open}>
      <DialogCloseButton/>
      {this.state.feedback}
      <br/>
      <span>Resultat {this.state.result}</span>
    </Dialog>
 */
