squirrelsIndex = function(){

  var html = "" +
    "<div class='squirrel {id}' data-id='{id}'>" +
     "<div class='name'>" +
        "{name} " +
      "</div>" +
      "<div class='counts'>" +
        "<div class='item'>" +
          "<label>Nuts: </label>" +
          "<span class='value'>{nutCount}</span>" +
        "</div>" +
        "<div class='item'>" +
          "<label>Trees: </label>" +
          "<span class='value'>{treeCount}</span>" +
        "</div>" +
      "</div>" +
      "<div class='actions'>" +
        "<a class='btn' href='/squirrels/{id}/nuts'>nuts</a>" +
        "<a class='btn' href='/squirrels/{id}/trees'>trees</a>" +
        "<a id='delete' class='btn delete' href='#'>delete</a>" +
      "</div>" +
    "</div> ";

    var addSquirrel = function( squirrel ){
      var htmlToAdd = html.replace(/{id}/g, squirrel.id);     
      htmlToAdd = htmlToAdd.replace(/{name}/g, squirrel.name);     
      htmlToAdd = htmlToAdd.replace(/{nutCount}/g, squirrel.nutCount);     
      htmlToAdd = htmlToAdd.replace(/{treeCount}/g, squirrel.treeCount);     
      $('.list-content').append( htmlToAdd );
    };

    var addSquirrels = function( squirrels ){
      $.each(squirrels, function(x,item){
        addSquirrel( item );  
      });
    };

    var removeSquirrel = function( id ){
      $('div.squirrel.' + id).remove(); 
    };

    document.addEventListener('getSquirrelsCompleted',function(e){
      
      addSquirrels(e.detail.sqrls);
      
      $('.btn.delete').on('click', function(e){
        e.preventDefault();
        $sqrl = $(this).closest('div.squirrel'); 
        $data = $sqrl.data();
        var evnt = new CustomEvent( 'deleteSqrlClicked',
                                    {detail: { id: $data.id }});
        document.dispatchEvent(evnt)
      ;});}, false);

    document.addEventListener('deleteSquirrelCompleted',function(e){
      removeSquirrel(e.detail.id);
    });

    return{ html           : html,
            addSquirrels   : addSquirrels,
            removeSquirrel : removeSquirrel
          }
    
}();
