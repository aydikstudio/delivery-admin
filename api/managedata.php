<?php 
require 'config.php';



if(isset($_GET)) {
    if($_GET['type'] == 'addcategory' ) {
        $query_add = "INSERT INTO `categories`(`name`,  `parent_id`, `level` ) 
        VALUES ('".$_GET['name']."', '".$_GET['parent']."', '".$_GET['level']."')";
    $res_add = mysqli_query($mysqli, $query_add);
    if($res_add) {
        echo "yes";
    }
    }


    if($_GET['type'] == 'allgetcategories' ) {
        $query_add = "SELECT * FROM `categories`";
        $res = mysqli_query($mysqli, $query_add);
        while ($result =  mysqli_fetch_assoc($res)) {
            $data[] = $result;
         }
         echo json_encode($data);
    }
}
?>