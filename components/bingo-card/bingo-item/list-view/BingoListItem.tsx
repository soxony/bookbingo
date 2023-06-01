import { Box } from 'theme-ui';
import ListComplete from './ListComplete';
import ListIncomplete from './ListIncomplete';

interface BingoListItemProps {
  cardId: string;
  archived: boolean;
  usersCard: boolean;
  square: Square;
}

function BingoListItem({
  archived,
  cardId,
  square,
  usersCard,
}: BingoListItemProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'primary',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        justifyContent: () => square?.book?.cover ? 'flex-start' : 'center',
        overflow: 'hidden',
        position: 'relative',
        inlineSize: ['98%', '512px'],
        blockSize: '212px',
        border: (theme) =>
          `solid 1px ${
            square.book
              ? square.color ?? theme.colors.accent
              : theme.colors.secondary
          }`,
        borderRadius: '5px',
        boxShadow: (theme) =>
          `1px 1px 0px 1px ${
            square.book
              ? square.color ?? theme.colors.accent
              : theme.colors.secondary
          }`,
          marginInline: 'auto'
      }}
    >
      {square.book ? (
        <ListComplete
          archived={archived}
          cardId={cardId}
          squareId={square.id}
          book={square.book}
          req={square.req}
          usersCard={usersCard}
        />
      ) : (
        <ListIncomplete
          archived={archived}
          cardId={cardId}
          squareId={square.id}
          req={square.req}
          usersCard={usersCard}
        />
      )}
    </Box>
  );
}

export default BingoListItem;
