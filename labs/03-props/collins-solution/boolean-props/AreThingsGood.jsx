export const AreThingsGood = (props) => {
  return (
    <div>
      {props.isGood ? (
        <div>Things are good</div>
      ) : (
        <div>Things could be better</div>
      )}
    </div>
  );
};
