
import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function SortFilter() {

  const { setMasters, masters} = useContext(FrontContext);

    const [sortBy, setSortBy] = useState('default');
    

  

    const doSort = e => {
        setSortBy(e.target.value);
        const p = [...masters]
        switch (e.target.value) {
            case 'ascName':
                p.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                break;
            case 'descName':
                p.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
                break;
            case 'ascRate':
                p.sort((a, b) => a.rate - b.rate);
                break;
            case 'descRate':
                p.sort((a, b) => b.rate - a.rate);
                break;
                case 'ascCity':
                  p.sort((a, b) => {
                      if (a.city > b.city) return 1;
                      if (a.city < b.city) return -1;
                      return 0;
                  });
                  break;
              case 'descCity':
                  p.sort((a, b) => {
                      if (a.city > b.city) return -1;
                      if (a.city < b.city) return 1;
                      return 0;
                  });
                  break;
            default:
                p.sort((a, b) => a.row - b.row);
        }
        setMasters(p);
    }

    return (
        
                        <div className="col-4">
                            <div className="form-group">
                                <label>Sort By</label>
                                <select className="form-control" value={sortBy} onChange={doSort}>
                                    <option value="default">Default Sort</option>
                                    <option value="ascNamee">Name A-Z</option>
                                    <option value="descName">Name Z-A</option>
                                    <option value="ascRate">Rating min-max</option>
                                    <option value="descRate">Rating max-min</option>
                                    <option value="ascCity">City A-Z</option>
                                    <option value="descCity">City Z-A</option>
                                </select>
                            </div>
                        </div>
                        
                        
                    
    );
}

export default SortFilter;
