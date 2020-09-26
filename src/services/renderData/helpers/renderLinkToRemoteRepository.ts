import {Branch} from '@project-types/entities';
import {TextEntity} from 'src/constants';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';
import renderLineWithLabel from 'src/services/renderData/helpers/renderLineWithLabel';

const renderLinkToRemoteRepository = (branch: Branch): void => {
    const {repositoryUrl, refType, id: name} = branch;

    if (repositoryUrl) {
        const chalkedUrl = chalkTextEntity(TextEntity.url, repositoryUrl);

        let label: string;

        if (name === 'master') {
            label = 'branch';
        } else if (refType === 'tag') {
            label = 'tag';
        } else {
            label = 'pr';
        }

        renderLineWithLabel(label, chalkedUrl);
    }
};

export default renderLinkToRemoteRepository;
