import { IExperienceItem } from 'utils/interfaces/components';
import './ExpeerienceItem.css'

const ExperienceItem = (props:IExperienceItem) => {
  const { date, title, companyName } = props;

  return <div className="experience-item-con">
    <div className="content-con">
        <h4 className="date">{date}</h4>
        <p className="title">{title}</p>
        <div className='company' >
            <div className='circle' />
            <span className='title' >{companyName}</span>
        </div>
        <div className='left-tringle' />
      </div>
  </div>;
};

export default ExperienceItem;
