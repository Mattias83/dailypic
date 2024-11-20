<?php
$directory = 'pics/'; // path to pics (dailypic images)
$files = array_diff(scandir($directory), array('.', '..'));
echo json_encode(array_values($files)); // Returns json array
