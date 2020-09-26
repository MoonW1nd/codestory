import {Options} from '@project-types/options';
import {TICKET_NAME_REGEXP, TextEntity} from 'src/constants';
import chalkTextEntity from 'src/services/renderData/helpers/chalkEntity';
import renderLineWithLabel from 'src/services/renderData/helpers/renderLineWithLabel';

const renderLinkToTicketByBranchName = (branchName: string, {trackerUrl}: Options): void => {
    const [ticketName] = branchName.match(TICKET_NAME_REGEXP) || [];

    if (trackerUrl && ticketName) {
        const ticketUrl = chalkTextEntity(TextEntity.url, `${trackerUrl}/${ticketName}`);

        renderLineWithLabel(ticketUrl);
    }
};

export default renderLinkToTicketByBranchName;
